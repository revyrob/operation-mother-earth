import "./ButtonBig.scss";

function Button({ img, alt, text, imgLrg, altLrg }) {
  return (
    <button className="btnBig">
      <img className="btnBig--img" src={img} alt={alt} />
      <h2 className="btnBig--text">{text}</h2>
    </button>
  );
}
export default Button;
