import { render } from "./utils/renderDOM";
import { MakeLogin } from './pages/Maker';

// app — это class дива в корне DOM
render(".app", MakeLogin());
