from __future__ import annotations

from pathlib import Path

from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:  # pragma: no cover
    import tensorflow as tf


def load_wheat_model(model_path: Path) -> Any:
    """
    Load the trained CNN model once for inference.

    Expected formats:
    - Keras v3 native format: *.keras (recommended)
    - Legacy HDF5: *.h5
    """
    if not model_path.exists():
        raise FileNotFoundError(
            f"Model file not found at: {model_path}. "
            "Place your trained model there or update app/config.py (settings.model_path)."
        )

    try:
        import tensorflow as tf  # type: ignore
    except ModuleNotFoundError as e:
        raise RuntimeError(
            "TensorFlow is not installed, so the CNN model cannot be loaded. "
            "Install it (or use a Python version supported by TensorFlow) to enable /predict."
        ) from e

    model = tf.keras.models.load_model(model_path, compile=False)
    return model

