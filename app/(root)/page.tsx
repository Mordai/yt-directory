import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Adrian" },
      _id: 1,
      descriptions: "Test description",
      image:
        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Robots",
      title: "We Robot",
    },
  ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup,
          <br />
          Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?.id} post={post} />
            ))
          ) : (
            <p className="no-results">No tartups Found</p>
          )}
        </ul>
      </section>
    </>
  );
}
