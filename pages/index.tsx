import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>LocaMaster - Test</title>
      </Head>
      <div className="min-h-screen bg-blue-500 text-white flex items-center justify-center">
        <h1 className="text-4xl">LocaMaster fonctionne ! 🚀</h1>
      </div>
    </>
  )
}