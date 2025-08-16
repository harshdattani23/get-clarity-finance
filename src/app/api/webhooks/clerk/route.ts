import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  console.log('Webhook received');
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET not found');
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers');
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);
  console.log('Webhook payload:', body);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  const eventType = evt.type;
  console.log('Webhook event type:', eventType);

  if (eventType === 'user.created') {
    const { id, email_addresses, username } = evt.data;
    console.log('Processing user.created event for Clerk ID:', id);
    
    try {
      await db.user.create({
          data: {
              clerkId: id,
              email: email_addresses[0].email_address,
              username: username,
              watchlists: {
                  create: [
                      { name: "My Watchlist" },
                  ]
              }
          }
      });
      console.log('User created in DB:', id);
      return new Response('User created', { status: 201 });
    } catch (dbError) {
      console.error('Database error creating user:', dbError);
      return new Response('Database error', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses } = evt.data;
    console.log('Processing user.updated event for Clerk ID:', id);

    try {
      await db.user.update({
        where: {
          clerkId: id,
        },
        data: {
          email: email_addresses[0].email_address,
        },
      });

      console.log('User updated in DB:', id);
      return new Response('User updated', { status: 200 });
    } catch (dbError) {
      console.error('Database error updating user:', dbError);
      return new Response('Database error', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    console.log('Processing user.deleted event for Clerk ID:', id);

    try {
      await db.user.delete({
        where: {
          clerkId: id,
        },
      });

      console.log('User deleted from DB:', id);
      return new Response('User deleted', { status: 200 });
    } catch (dbError) {
      console.error('Database error deleting user:', dbError);
      return new Response('Database error', { status: 500 });
    }
  }

  console.log('Webhook event type not handled:', eventType);
  return new Response('', { status: 200 })
}



