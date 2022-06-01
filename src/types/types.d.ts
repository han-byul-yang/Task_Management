export interface IHealthResponse {
  userInfo: UserInfo;
  wxcResultMap: WxcResultMap;
  healthScoreList: HealthScoreList[];
  rtnCd: string;
  healthTagList: HealthTagList[];
}

export interface IHealthTagList {
  tagId: string;
  tag1: string;
  tag2: string;
  tag3: string;
}

export interface IHealthScoreList {
  SCORE: string;
  TYPE_CD: string;
  SUBMIT_DATE: string;
  CNTNS: string;
}

export interface IWxcResultMap {
  maxHis: string;
  medi_peer: string;
  wHage: string;
  wMymaxHscoreDy: number[];
  mediGapSum: number[];
  diabmlRate: string;
  ihd_peer: string;
  totalRate: string;
  his: string;
  contribution: Contribution;
  deathRate: string;
  wIdealHscoreDy: number[];
  idealMediDy: number[];
  mediIncreasePercent: string;
  s_contribution: Scontribution;
  hscore_peer: string;
  hscorePercent: string;
  totalCont: TotalCont;
  hdiseRate: string;
  sHage: string;
  paramMap: ParamMap;
  wMymaxHscore: string;
  topCont: TopCont;
  w_contribution: Wcontribution;
  ihd: string;
  wHscore: string;
  wHscoreDy: number[];
  percentList: string;
  cancerRate: string;
  wIdealHscore: string;
  sex: number;
  mediExDy: number[];
  idealMedi: string;
  mediDy: number[];
  sHage_peer: string;
  medi: string;
  checkMap: CheckMap;
  maxIhd: string;
  maxSHage: string;
  idealMediExDy: number[];
  contribution_point: Contributionpoint;
  his_peer: string;
  mediSum: number[];
  boj: Boj;
  idealMediSum: number[];
  age: number;
}

export interface IBoj {
  resHDLCholesterol: string;
  resBMI: string;
  resUrinaryProtein: string;
  resBloodPressure: string;
  resTotalCholesterol: string;
  smkQty: string;
  resFastingBloodSuger: string;
  drnkQty: string;
  resGFR: string;
  exerciQty: string;
  resLDLCholesterol: string;
}

export interface IContributionpoint {
  totalPoint: number;
  resBMI: number;
  resUrinaryProtein: number;
  resTotalCholesterol: number;
  resFastingBloodSuger: number;
  exerciQty: number;
}

export interface ICheckMap {
  etcdsePresc: string;
  dlpdPresc: string;
  fmlyCancer: string;
  apopPresc: string;
  dmPresc: string;
  phssPresc: string;
  smkQty: string;
  fmlyHdise: string;
  fmlyDiabml: string;
  hprtsPresc: string;
  fmlyApop: string;
  hdisePresc: string;
  drnkQty: string;
  exerciQty: string;
  fmlyHprts: string;
}

export interface IWcontribution {
  resBMI: number;
  resUrinaryProtein: number;
  resTotalCholesterol: number;
  resFastingBloodSuger: number;
  exerciQty: number;
}

export interface ITopCont {
  topContValue: string;
  topContName: string;
}

export interface IParamMap {
  resCheckupDate: string;
  apopPresc: string;
  constant: string;
  resSight: string;
  resSerumCreatinine: string;
  resWeight: string;
  phssPresc: string;
  smkQty: string;
  resAST: string;
  resOsteoporosis: string;
  resJudgement: string;
  fmlyDiabml: string;
  resWaist: string;
  resHDLCholesterol: string;
  resHemoglobin: string;
  bpLwst: string;
  resUrinaryProtein: string;
  fmlyApop: string;
  bpHigh: string;
  resCheckupPlace: string;
  resFastingBloodSuger: string;
  drnkQty: string;
  exerciQty: string;
  resLDLCholesterol: string;
  fmlyHprts: string;
  etcdsePresc: string;
  resTriglyceride: string;
  dlpdPresc: string;
  fmlyCancer: string;
  resALT: string;
  resTBChestDisease: string;
  dmPresc: string;
  sex: string;
  checkMap: string;
  fmlyHdise: string;
  resBMI: string;
  hprtsPresc: string;
  resHearing: string;
  resBloodPressure: string;
  resTotalCholesterol: string;
  hdisePresc: string;
  resCheckupYear: string;
  resHeight: string;
  resGFR: string;
  resyGPT: string;
  age: string;
}

export interface ITotalCont {
  resHDLCholesterol: string;
  resBMI: string;
  resUrinaryProtein: string;
  resTotalCholesterol: string;
  resFastingBloodSuger: string;
  exerciQty: string;
  resLDLCholesterol: string;
}

export interface IScontribution {
  resHDLCholesterol: number;
  resBMI: number;
  resFastingBloodSuger: number;
  exerciQty: number;
  resLDLCholesterol: number;
}

export interface IContribution {
  bloodPressure: BloodPressure;
  medical: Medical;
  bloodSugar: BloodSugar;
  weight: Weight;
  cholesterol: Cholesterol;
  life: Life;
}

export interface ILife {
  exerciQty: string;
}

export interface ICholesterol {
  resHDLCholesterol: string;
  resTotalCholesterol: string;
  resLDLCholesterol: string;
}

export interface IWeight {
  resBMI: string;
}

export interface IBloodSugar {
  resFastingBloodSuger: string;
}

export interface IMedical {
  resUrinaryProtein: string;
}

export interface IBloodPressure {
}

export interface IUserInfo {
  healthScript: string;
  healthScore: string;
  healthDate: string;
}
