import axios from "axios";

const LOSPEC_URL = "https://lospec.com/palette-list";

axios.get(LOSPEC_URL).then((response) => {console.log(response);});