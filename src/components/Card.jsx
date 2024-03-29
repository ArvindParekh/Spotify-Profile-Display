/* eslint-disable react/prop-types */

const Card = ({ data, title }) => {
  console.log(data);

  return (
    <>
      {data && (
        <aside className="bg-white shadow-2xl flex flex-col border border-[#d6d6d6] rounded-3xl items-center w-[70%] h-[70%] my-auto justify-evenly">
          <h1 className="font-bold text-6xl tracking-tight leading-[1.1]">
            Here are your top 20 {title}
          </h1>

          {/* <ol> */}
          {console.log(data)}
          <div className="flex items-center w-[100%] pl-40">
            <ol className="w-1/4 text-muted-foreground list-decimal">
              {data.slice(0, 5).map((artist, index) => {
                return (
                  <li className="text-xl p-2" key={index}>
                    {artist.name}
                  </li>
                );
              })}
            </ol>

            <ol className="w-1/4 text-muted-foreground list-decimal" start={6}>
              {data.slice(5, 10).map((artist, index) => {
                return (
                  <li className="text-xl p-2" key={index}>
                    {artist.name}
                  </li>
                );
              })}
            </ol>

            <ol className="w-1/4 text-muted-foreground list-decimal" start={11}>
              {data.slice(10, 15).map((artist, index) => {
                return (
                  <li className="text-xl p-2" key={index}>
                    {artist.name}
                  </li>
                );
              })}
            </ol>

            <ol className="w-1/4 text-muted-foreground list-decimal" start={16}>
              {data.slice(15).map((artist, index) => {
                return (
                  <li className="text-xl p-2" key={index}>
                    {artist.name}
                  </li>
                );
              })}
            </ol>
            {/* </ol> */}
          </div>
        </aside>
      )}
    </>
  );
};
export default Card;
