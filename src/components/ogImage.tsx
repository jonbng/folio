/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { type CollectionEntry } from "astro:content";

export default function (props: CollectionEntry<"blog">) {
  return (
    <>
      {/* @ts-ignore */}
      <div tw="flex flex-col w-full h-full p-12 items-center text-center justify-center text-white bg-indigo-500">
        {/* @ts-ignore */}
        <div tw="flex font-bold text-8xl mb-4">{props.data.title}</div>
        {/* @ts-ignore */}
        <div tw="flex text-5xl mb-12">{props.data.description}</div>
      </div>
    </>
  );
}
