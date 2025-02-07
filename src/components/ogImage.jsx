export default function (props) {
  return (
    <div tw="flex flex-col w-full h-full p-12 items-center text-center justify-center text-white bg-indigo-500">
      <div tw="flex font-bold text-8xl mb-4">{props.data.title}</div>
      <div tw="flex text-5xl mb-12">{props.data.description}</div>
    </div>
  );
}
