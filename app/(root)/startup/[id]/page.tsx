import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY_BY_ID } from "@/sanity/lib/quries";
import { notFound } from "next/navigation";
import React from "react";

export const experimental_ppr = true;

const StartupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUPS_QUERY_BY_ID, { id });

  if (!post) return notFound();
  return (
    <>
      <h1>{post.title}</h1>
    </>
  );
};

export default StartupPage;
