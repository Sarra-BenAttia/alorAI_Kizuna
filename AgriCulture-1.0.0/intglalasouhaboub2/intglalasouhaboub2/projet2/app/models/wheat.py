from typing import Dict, List, Literal, Optional

from pydantic import BaseModel, Field


class VarietyRequest(BaseModel):
    variety_name: str


class CNNImageRequest(BaseModel):
    image_base64: str


class ProfileWeights(BaseModel):
    drought: float = 0.25
    salt: float = 0.25
    yield_score: float = Field(default=0.25, alias="yield")
    disease: float = 0.25


class RecommendRequest(BaseModel):
    variety_name: Optional[str] = None
    mode: Literal["variety", "profile", "pareto"] = "variety"
    profile: Optional[ProfileWeights] = None
    preset: Optional[Literal["drought_max", "yield_max", "balanced", "custom"]] = None
    top_n: int = 5


class SequenceRequest(BaseModel):
    fasta_sequence: str


class TraitScores(BaseModel):
    drought: float
    salt: float
    yield_score: float = Field(alias="yield")
    disease: float
    composite_score: Optional[float] = None


class CrossingResult(BaseModel):
    crossing_name: str
    parent_A: Optional[str] = None
    parent_B: Optional[str] = None
    predicted_traits: TraitScores
    score: float
    rank: int
    strong_trait: str
    weak_trait: str


class SHAPFeature(BaseModel):
    snp: str
    importance: Optional[float] = None
    shap_value: Optional[float] = None
    feature_value: Optional[float] = None
    direction: Optional[Literal["positive", "negative"]] = None


class MonteCarloTraitResult(BaseModel):
    mean: float
    std: float
    p5: float
    p95: float
    p_threshold_pct: float


class DecisionResult(BaseModel):
    status: Literal["stable", "moderate", "unstable"]
    cv_pct: float
    action: Literal["accept", "warn_xai", "trigger_step10"]
    message: str
    redirect_to_odm: bool


class OligoResult(BaseModel):
    sequence: str
    score_odm: float
    gc_pct: float
    tm_celsius: float
    length_bp: int


class SNPEditResult(BaseModel):
    snp: str
    chromosome: Optional[str]
    position: Optional[int]
    allele_original: str
    allele_optimal: str
    edit_type: Literal["CBE", "ABE", "other"]
    agront_improvement_pct: float
    traits_improved: List[str]
    best_oligo: OligoResult


class PipelineRequest(BaseModel):
    variety_name: str
    recommendation_mode: Literal["variety", "profile", "pareto"] = "variety"
    profile_weights: Optional[Dict[str, float]] = None
    n_simulations: int = 1000
    top_n_crossings: int = 5


class PipelineResponse(BaseModel):
    variety_name: str
    step1_parent: dict
    step2_crossings: List[CrossingResult]
    step3_best_crossing: str
    step4_shap: dict
    step5_montecarlo: dict
    step6_decision: DecisionResult
    step7_odm: Optional[List[SNPEditResult]] = None
    pipeline_complete: bool
    final_recommendation: str
