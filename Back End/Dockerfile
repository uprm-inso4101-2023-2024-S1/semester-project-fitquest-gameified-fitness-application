# Use an official Python runtime as a parent image
FROM python:3.8

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements into the container at /app
COPY requirements.txt .

# Install Flask and other dependencies
RUN pip install -r requirements.txt

# Copy the project contents into the container at /app
COPY ./app .

# Expose port 5000 for Flask
EXPOSE 5000

# Define the command to run when the container starts
CMD ["python", "app.py"]
