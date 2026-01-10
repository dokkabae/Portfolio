# Makefile for Vite + React project
# npm install checks the package.json file for the necesarry dependancies and installs them

.DEFAULT_GOAL := help

.PHONY: help setup install dev build preview clean

help:
	@echo "Available targets:"
	@echo "  make setup    - Install Node.js dependencies (React, Vite, React Router, etc.)"
	@echo "  make dev      - Start the Vite dev server with hot reload"

# Install all deps (React, ReactDOM, React Router, Vite, etc.)
setup:
	npm install


# Run the Vite dev server
dev:
	npm run dev

