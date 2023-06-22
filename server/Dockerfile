# BUILD STAGE
# =====================

FROM python:3.9-alpine AS builder

# Set the DOCKER_BUILDKIT variable to 1
ARG DOCKER_BUILDKIT=1
WORKDIR /app
COPY requirements.txt ./
RUN apk add --no-cache \
    build-base \
    libressl-dev \
    libffi-dev \
    && pip install --no-cache-dir --user -r requirements.txt \
    && rm -rf /root/.cache/pip


# PRODUCATION STAGE
#=====================

FROM python:3.9-alpine

WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]