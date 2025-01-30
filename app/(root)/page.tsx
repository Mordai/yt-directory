import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/quries";
import { Session } from "next-auth";
import { _isCustomDocumentTypeDefinition } from "sanity";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  const session = await auth();

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
            {posts?.map((_post: StartupType, _index: number) => (
              <StartupCard key={_post.title} post={_post} />
            ))}
          </ul>
        ) : (
          <p className="no-results">No Startups Found</p>
        )}
      </section>
      <SanityLive />
    </>
  );
}
