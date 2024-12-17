from mock import patch
import pytest
from api import  app
import json


@pytest.fixture
def client():
    """Fixture to create a test client for Flask"""
    with app.test_client() as client:
        yield client


# Test for /app/getter (GET)
def test_getter(client):
    # Mocking MongoDB data for testing
    mock_data = [{"name": "John Doe", "email": "john@example.com"}]

    # Mock the MongoDB collection's find() method to return mock data
    with patch('api.collection1.find', return_value=mock_data):
        response = client.get('/api/getter')
    # Check if the status code is 200
    assert response.status_code == 200
    

# Test for /app/createuser (POST)
def test_create_user(client):
    user_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    response = client.post('/api/createuser', json=user_data)
    assert response.status_code == 201
    assert b"User data inserted successfully" in response.data


# Test for /app/loginuser (POST)
def test_login_user(client):
    user_data = {
        "email": "john@example.com",
        "password": "password123"
    }
    response = client.post('/api/loginuser', json=user_data)
    assert response.status_code == 200
    assert b"Login Successful" in response.data

    # Test failed login due to incorrect password
    user_data["password"] = "wrongpassword"
    response = client.post('/api/loginuser', json=user_data)
    assert response.status_code == 401
    assert b"Incorrect Password" in response.data

    user_data["password"] = None
    response = client.post('/api/loginuser', json=user_data)
    assert response.status_code == 401
    assert b"Incorrect Password" in response.data


# Test for /app/getlocation (GET)
def test_get_location(client):
    response = client.get('/api/getlocation')
    assert response.status_code == 200
    assert b"location" in response.data  # Expecting a list of locations


# Test for /app/putlocation (POST)
def test_put_location(client):
    location_data = {
        "location": "New York"
    }
    response = client.post('/api/putlocation', json=location_data)
    assert response.status_code == 201
    assert b"User data inserted successfully" in response.data


# Test for /app/createtrip (POST)
def test_create_trip(client):
    trip_data = {
        "email": "john@example.com",
        "source":"London",
        "destination": "Paris",
        "createdAt": "2024-05-10",
        "amount":23
    }
    response = client.post('/api/createtrip', json=trip_data)
    assert response.status_code == 201
    assert b"Trip data inserted successfully" in response.data


# Test for /app/gettrip (POST)
def test_get_trip(client):
    trip_data = {
        "email": "john@example.com"
    }
    response = client.post('/api/gettrip', json=trip_data)
    assert response.status_code == 200
    assert b"trips" in response.data  # Expecting a list of trips


# Test for /my-server/create-paypal-order (POST)
def test_create_paypal_order(client):
    order_data = {
        "amount": 100.00
    }
    response = client.post('/my-server/create-paypal-order', json=order_data)
    assert response.status_code == 200
    assert b"approval_url" in response.data  # PayPal response should include this URL


# Test for /payment/cancel (GET)
def test_cancel_payment(client):
    response = client.get('/payment/cancel')
    assert response.status_code == 200
    assert b"Payment canceled" in response.data
