import { render } from "./utils/renderDOM";
import { MakeLogin, MakeProfile, MakeRegister, MakeErrors, MakeCharts } from './pages/Maker';

// app — это class дива в корне DOM
//render(".app", MakeLogin());
//render(".app", MakeProfile());

render(".app", MakeRegister());

//render(".app", MakeErrors(500))

//render(".app", MakeCharts())
