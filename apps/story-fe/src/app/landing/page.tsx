"use client";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-full py-20 mx-auto lg:w-8/12 xl:w-5/12 md:py-32">
        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
          Canvas free drawing!
        </h1>
        <p className="mb-5 text-base text-gray-500 md:text-lg">
          <h2>Features</h2>
          <ul>
            <li>- Auth</li>
            <li>- Canvas operation</li>
            <li>- Canvas state save</li>
            <li>- IDL Usage and auto generated apis</li>
            <li>- Animation for history replay</li>
            <li>- Start from Login!</li>
          </ul>
        </p>
      </section>
    </main>
  );
}
