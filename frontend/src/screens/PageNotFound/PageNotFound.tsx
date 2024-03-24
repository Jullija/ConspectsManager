import { colors } from "../../utils/colors";

const PageNotFound = () => {
  return(
    <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center"}}>
      <h1 style={{color: colors.darkblue}}>Page. Not. Found.</h1>
      <img src="https://tenor.com/en-GB/view/pulp-fiction-john-travolta-lost-where-wtf-gif-10251428.gif" style={{width: "700px", height:"700px"}}></img>
    </div>


   
  );
};

export default PageNotFound;
