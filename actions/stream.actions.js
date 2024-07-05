"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async ()=> {
  const user = await currentUser()

  if(!user) throw new error('user not logged in');
  if(!apiKey) throw new error('stream api key missing');
  if(!secret) throw new error('stream secret key missing');

  const client = new StreamClient(apiKey, secret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.round(new Date() / 1000) - 60;

  const token = client.createToken(user?.id, exp, issued);

  return token
}
