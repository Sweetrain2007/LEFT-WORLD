-- Run AFTER the migration in Supabase SQL Editor, using its postgres role.
-- All fixtures roll back. Tests exercise actual database roles, not frontend filters.
begin;
insert into auth.users(id,aud,role,is_anonymous) values
('11111111-1111-4111-8111-111111111111','authenticated','authenticated',true),
('22222222-2222-4222-8222-222222222222','authenticated','authenticated',true);
insert into public.messages(id,author_id,content,visibility,x,y) values
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1','11111111-1111-4111-8111-111111111111','RLS A PUBLIC','public',20,20),
('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2','11111111-1111-4111-8111-111111111111','RLS A PRIVATE','private',30,30),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1','22222222-2222-4222-8222-222222222222','RLS B PUBLIC','public',40,40),
('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2','22222222-2222-4222-8222-222222222222','RLS B PRIVATE','private',50,50);
insert into message_wall_private.blocked_words(word) values ('__RLS_BLOCK_TEST__');
set local role authenticated;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated","is_anonymous":true}',true);
insert into public.messages(author_id,content,visibility,x,y) values (auth.uid(),'allowed owner insert','private',25,25);
do $$ begin
  assert (select count(*) from public.messages where content like 'RLS %') = 3, 'A should see own rows + B public';
  assert not exists(select 1 from public.messages where content='RLS B PRIVATE'), 'A cannot fetch B private directly';
  begin
    insert into public.messages(author_id,content,visibility,x,y) values ('22222222-2222-4222-8222-222222222222','forged','public',20,20);
    raise exception 'Forged author unexpectedly allowed';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.messages(author_id,content,visibility,x,y) values (auth.uid(),'__RLS_BLOCK_TEST__','public',20,20);
    raise exception 'Blocked content unexpectedly allowed';
  exception when raise_exception then if sqlerrm <> 'MESSAGE_BLOCKED' then raise; end if; end;
  begin
    insert into public.messages(author_id,content,visibility,status,x,y) values (auth.uid(),'forced status','public','approved',20,20);
    raise exception 'Client status unexpectedly allowed';
  exception when insufficient_privilege then null; end;
  begin update public.messages set content='changed' where author_id=auth.uid(); raise exception 'Update unexpectedly allowed'; exception when insufficient_privilege then null; end;
  begin delete from public.messages where author_id=auth.uid(); raise exception 'Delete unexpectedly allowed'; exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","role":"authenticated","is_anonymous":true}',true);
do $$ begin
  assert exists(select 1 from public.messages where content='RLS A PUBLIC'), 'B must see A public';
  assert not exists(select 1 from public.messages where content='RLS A PRIVATE'), 'B cannot fetch A private directly';
  assert (select count(*) from public.messages where author_id=auth.uid() and content like 'RLS %')=2, 'B mine excludes A';
end $$;
reset role;
update public.messages set status='pending' where content='RLS A PUBLIC';
set local role anon;
select set_config('request.jwt.claim.sub','',true);
select set_config('request.jwt.claims','{"role":"anon"}',true);
do $$ begin
  assert (select count(*) from public.messages where content like 'RLS %')=1, 'Unauthenticated can only read approved public';
end $$;
reset role;
rollback;
