import Level from "../components/Level/Level";
import NavBar from "../components/NavBar/NavBar";

function Levels({ nextQueston }) {
  return (
    <>
      <div className="page">
        <NavBar />
        <Level level={nextQueston} />
      </div>
    </>
  );
}
export default Levels;
