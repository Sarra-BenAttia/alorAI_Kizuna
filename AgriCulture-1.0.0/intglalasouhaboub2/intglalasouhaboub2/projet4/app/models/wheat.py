from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field, model_validator

from app.config import HORIZONS, SCENARIOS


class WheatTraits(BaseModel):
    pred_drought: float = Field(..., ge=0, le=1)
    pred_salt: float = Field(0.5, ge=0, le=1)
    pred_yield: float = Field(..., ge=0, le=1)
    pred_disease: float = Field(..., ge=0, le=1)


class PredictRequest(BaseModel):
    row: WheatTraits


class Alerte(BaseModel):
    type: str
    message: str
    severite: Literal["INFO", "WARNING", "CRITIQUE"] = "INFO"
    jour: Optional[int] = None


class PredictResponse(BaseModel):
    twso: float
    lai_max: float
    dvs_final: float
    alertes: List[Alerte]
    wofost_params: Dict[str, Any]


class RecommendRequest(BaseModel):
    variety_name: Optional[str] = None
    traits: Optional[WheatTraits] = None
    horizon: Literal[tuple(HORIZONS)] = "6_mois"
    scenario: Literal[tuple(SCENARIOS)] = "normal"
    yield_score: Optional[float] = Field(None, ge=0, le=1)
    drought_score: Optional[float] = Field(None, ge=0, le=1)
    disease_score: Optional[float] = Field(None, ge=0, le=1)
    salt_score: Optional[float] = Field(None, ge=0, le=1)
    row: Optional[WheatTraits] = None

    @model_validator(mode="after")
    def _normalize_sources(self) -> "RecommendRequest":
        # Accept notebook-like payloads:
        # - {"row": {...}}
        # - {"yield_score":..., "drought_score":..., "disease_score":..., "salt_score":...}
        if self.traits is None and self.row is not None:
            self.traits = self.row

        if self.traits is None and (
            self.yield_score is not None
            or self.drought_score is not None
            or self.disease_score is not None
            or self.salt_score is not None
        ):
            self.traits = WheatTraits(
                pred_yield=self.yield_score if self.yield_score is not None else 0.75,
                pred_drought=self.drought_score if self.drought_score is not None else 0.60,
                pred_disease=self.disease_score if self.disease_score is not None else 0.70,
                pred_salt=self.salt_score if self.salt_score is not None else 0.50,
            )

        return self


class Projection(BaseModel):
    twso_mean: float
    twso_p10: float
    twso_p90: float
    confidence: float


class StressRisks(BaseModel):
    drought: float
    disease: float
    salt: float = 0.0
    heat: float
    overall: float


class SimilarVariety(BaseModel):
    variety_name: str
    distance: float
    traits: WheatTraits


class RecommendResponse(BaseModel):
    projection: Projection
    stress_risks: StressRisks
    recommendations: List[str]
    top_similar: List[SimilarVariety]


class SimulateRequest(BaseModel):
    row: WheatTraits
    n_jours: int = Field(200, ge=1, le=1000)
    scenario: Literal[tuple(SCENARIOS)] = "normal"


class MeteoJour(BaseModel):
    jour: int
    tmin: float
    tmax: float
    pluie_mm: float
    irrad_mj: float
    wind: float
    vap: float


class SimulateResponse(BaseModel):
    meteo_simulee: List[MeteoJour]
    evenements: List[Alerte]
    nb_alertes_critique: int


class NormsResponse(BaseModel):
    genomique: Dict[str, Any]
    wofost_baseline: Dict[str, Any]
    seuils_alerte: Dict[str, Any]
    twso_baseline: float


class HealthResponse(BaseModel):
    status: str = "ok"
    normes_loaded: bool
    df_rows: int


class VizDataResponse(BaseModel):
    yieldScore: float = Field(..., ge=0, le=1)
    droughtScore: float = Field(..., ge=0, le=1)
    diseaseScore: float = Field(..., ge=0, le=1)
    scenario: Literal[tuple(SCENARIOS)]
    horizonDays: int
    twso: float
    twsoP10: float
    twsoP90: float
    confidence: float
    stressRisks: Dict[str, float]
    recommendations: List[str]
    varietyName: str
    normsBaseline: float

