#!/bin/bash

# Racine du projet
PROJECT_ROOT="mam-tracker"

FRONTEND="/"
FRONTEND_SRC="/src"
FRONTEND_COMPONENTS="$FRONTEND_SRC/components"
FRONTEND_STYLES="$FRONTEND_SRC/styles"
FRONTEND_TYPES="$FRONTEND_SRC/types"
FRONTEND_PUBLIC="/public"
mkdir -p "$FRONTEND_COMPONENTS"
mkdir -p "$FRONTEND_STYLES"
mkdir -p "$FRONTEND_TYPES"
mkdir -p "$FRONTEND_PUBLIC"