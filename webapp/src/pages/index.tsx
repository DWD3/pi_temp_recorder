import Head from 'next/head'
import useSWR from "swr";


export default function Home() {

  //TODO make this fetcher generic
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  //TODO make a separate layer for data fetching
  const { data } = useSWR("/api/current-temp", fetcher);

  return (
    <>
      <Head>
        <title>Room Temperature Monitor</title>
        <meta name="description" content="This is a web app to monitor my room temperature" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-center text-2xl font-bold mt-6">The current room temp is {data?.temp} &#8451; <br/> at {data?.timeRecored}</h1>
      </main>
    </>
  )
}
