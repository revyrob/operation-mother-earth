import Level from "../components/Level/Level";
import NavBar from "../components/NavBar/NavBar";

function Levels({ nextQueston }) {
  return (
    <>
      <div className="page">
        <Level level={nextQueston} />
        <NavBar />
      </div>
    </>
  );
}
export default Levels;
