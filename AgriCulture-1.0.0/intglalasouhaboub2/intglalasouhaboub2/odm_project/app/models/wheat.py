from dataclasses import dataclass, field
from typing import List


@dataclass
class BiologicalObjective:
    name: str
    description: str
    target_genes: List[str]
    preferred_effect: str
    priority_regions: List[str]
    max_off_target_risk: float = 0.3


@dataclass
class MutationCandidate:
    position: int
    original_base: str
    mutant_base: str
    mutation_type: str
    functional_region: str
    conservation_score: float
    predicted_effect: str
    biological_relevance: float
    dnabert_attention: float
    off_target_risk: float = 0.0
    final_score: float = 0.0


@dataclass
class ODMOligonucleotide:
    sequence: str
    mutation: MutationCandidate
    length: int
    gc_content: float
    tm: float
    delta_g: float
    secondary_structure_score: float
    off_target_risk: float
    predicted_efficiency: float
    predicted_success_prob: float
    composite_score: float
    mismatch_position: int
    strand: str = "sense"


WHEAT_OBJECTIVES = {
    "disease_resistance": BiologicalObjective(
        name="disease_resistance",
        description="Résistance fongique (rouille, oïdium)",
        target_genes=["TaMLO", "TaPR1", "TaNPR1", "TaWRKY"],
        preferred_effect="loss_of_function",
        priority_regions=["exon", "splice_donor", "splice_acceptor"],
    ),
    "yield_improvement": BiologicalObjective(
        name="yield_improvement",
        description="Amélioration rendement et poids des grains",
        target_genes=["TaGW2", "TaGW5", "TaTGW6", "TaGS5"],
        preferred_effect="loss_of_function",
        priority_regions=["exon", "promoter"],
    ),
    "herbicide_tolerance": BiologicalObjective(
        name="herbicide_tolerance",
        description="Tolérance aux herbicides (SU, imidazolinone)",
        target_genes=["TaALS", "TaACCase"],
        preferred_effect="gain_of_function",
        priority_regions=["exon"],
    ),
    "drought_tolerance": BiologicalObjective(
        name="drought_tolerance",
        description="Tolérance à la sécheresse",
        target_genes=["TaDREB1", "TaABF1", "TaNAC", "TaMYB"],
        preferred_effect="expression_increase",
        priority_regions=["promoter", "exon"],
    ),
    "starch_quality": BiologicalObjective(
        name="starch_quality",
        description="Modification qualité amidon",
        target_genes=["TaWaxy", "TaSSIIa", "TaSBEIIb"],
        preferred_effect="loss_of_function",
        priority_regions=["exon", "splice_donor", "splice_acceptor"],
    ),
}
