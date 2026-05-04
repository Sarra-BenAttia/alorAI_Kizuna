"""
models/wheat.py — Architectures LSTM et GRU pour la modélisation phénologique G×E
Blé dur (Triticum durum) — Tunisie Méridionale

Références :
  - Hochreiter & Schmidhuber (1997) — LSTM, Neural Computation
  - Cho et al. (2014) — GRU
  - Tian et al. (2021) — LSTM wheat yield, RSE
"""
import torch
import torch.nn as nn


class HybridLSTM(nn.Module):
    """
    LSTM 2 couches pour prédire les stades T6–T7 depuis T0–T5.
    Input  : (batch, seq_len=6, input_size=9) — 5 climat NASA + 4 traits génomiques
    Output : (batch, pred_len*n_traits=8)     — scores G×E T6,T7 × 4 traits
    """

    def __init__(
        self,
        input_size: int = 9,
        hidden_size: int = 64,
        num_layers: int = 2,
        output_size: int = 8,
        dropout: float = 0.2,
    ):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
        )
        self.dropout = nn.Dropout(dropout)
        self.fc = nn.Sequential(
            nn.Linear(hidden_size, 32),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(32, output_size),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        out, _ = self.lstm(x)
        out = self.dropout(out[:, -1, :])
        return self.fc(out)


class HybridGRU(nn.Module):
    """
    GRU 2 couches — variante plus légère que le LSTM.
    Même interface I/O que HybridLSTM.
    """

    def __init__(
        self,
        input_size: int = 9,
        hidden_size: int = 48,
        num_layers: int = 2,
        output_size: int = 8,
        dropout: float = 0.2,
    ):
        super().__init__()
        self.gru = nn.GRU(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
        )
        self.dropout = nn.Dropout(dropout)
        self.fc = nn.Sequential(
            nn.Linear(hidden_size, 24),
            nn.ReLU(),
            nn.Linear(24, output_size),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        out, _ = self.gru(x)
        out = self.dropout(out[:, -1, :])
        return self.fc(out)


def load_model(model_name: str, weights_path: str, device: str = "cpu"):
    """
    Charge le bon modèle (LSTM ou GRU) depuis ses poids sauvegardés.

    Args:
        model_name   : "LSTM" ou "GRU"
        weights_path : chemin vers le fichier .pth
        device       : "cpu" ou "cuda"

    Returns:
        model en mode eval()
    """
    if model_name == "LSTM":
        model = HybridLSTM(input_size=9, hidden_size=64, num_layers=2, output_size=8)
    elif model_name == "GRU":
        model = HybridGRU(input_size=9, hidden_size=48, num_layers=2, output_size=8)
    else:
        raise ValueError(f"Modèle inconnu : '{model_name}'. Choisir 'LSTM' ou 'GRU'.")

    state_dict = torch.load(weights_path, map_location=device)
    model.load_state_dict(state_dict)
    model.eval()
    return model
