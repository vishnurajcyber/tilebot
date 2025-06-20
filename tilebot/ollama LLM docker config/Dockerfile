FROM ollama/ollama

# Preload LLaVA model during image build
RUN ollama serve & sleep 3 && ollama pull llava

# Expose Ollama API port
EXPOSE 11434

# Run Ollama server
CMD ["ollama", "serve"]
