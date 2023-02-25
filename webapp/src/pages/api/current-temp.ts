// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/services/db/mongodb'

type Data = {
  temp: string;
  timeRecored:string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise
  const db = client.db('temp_recording');
  const collection = await db.collection('temp_recording');
  const latestReading = (await collection.find().limit(1).sort({$natural:-1}).toArray())[0];
  res.status(200).json(
    { temp: latestReading.temp,
      timeRecored: timeConverter(latestReading.timestamp)
    })
}

function timeConverter(UNIX_timestamp : number){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}