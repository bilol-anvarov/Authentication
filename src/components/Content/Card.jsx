import { Link } from "react-router-dom";
export default function Card ({ src, link, children }){
    return (
      <div className="card overflow-hidden rounded-2xl mt-5">
        <iframe
          className=" rounded-md"
          width="100%"
          height="215"
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <Link to={link}>
          <h2 className="px-2 mt-4">{children}</h2>
        </Link>
      </div>
    );
};