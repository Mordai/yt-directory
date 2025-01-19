import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/quries";
import { _isCustomDocumentTypeDefinition } from "sanity";

type StartupCardType = {
  title: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = await client.fetch(STARTUPS_QUERY);

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

        {posts?.length > 0 ? (
          <ul className="mt-7 card_grid">
            {posts?.map((_post: StartupCardType, index: number) => (
              <StartupCard key={_post.title} post={_post} />
            ))}
          </ul>
        ) : (
          <p className="no-results">No Startups Found</p>
        )}
      </section>
    </>
  );
}
