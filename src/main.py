from flask import Flask, render_template,request
from flask_cors import CORS
from pymongo import MongoClient
from flask import Flask, jsonify, redirect
from flask_cors import CORS
from bson.json_util import dumps 
import paypalrestsdk
from paypalrestsdk import Payment


app = Flask(__name__)
CORS(app)
# CORS(app,origins=["http://localhost:3000","https://bookings-1-6jid.onrender.com/"])
client = MongoClient('mongodb+srv://anshu12:anshu12@cluster0.uspga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')  
db = client['Flask_db'] 
collection1 = db['users']
collection2 = db['trips']
collection3 = db['locations']
collection4 = db['loccoord']




paypalrestsdk.configure({
    "mode": "sandbox",  # "sandbox" or "live" based on your environment
    "client_id": "AcCgZyHcVmlo6zhqlihQbaBU06D5LqflguFXODAgACe5Qpou72UFKIyBS7D4IOatiBiZgVuAFB09LreP",
    "client_secret": "EHCO0NEL0EvuALs238zQ3UgwwqDzgM5XkEnukEy_iQMIbknD2guptYigQq5VQLnkHC97rP1Y-IvR_wOH"
})
@app.route('/api/getter' , methods=['GET'])
def getData():
    try:
        data=collection1.find()
        return jsonify(dumps(data))
    except Exception as e:
        return e

@app.route('/api/createuser' , methods=['POST'])
def createUser():
    try:
        data = request.get_json()  
        collection1.insert_one(data)
        return jsonify({"message": "User data inserted successfully","success":True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/loginuser' , methods=['POST'])
def loginUser():
    try:
        userdata=request.get_json() 
        data = collection1.find_one({"email":userdata['email']})  
        if(data==None):
            return  jsonify({"message": "Error 404 Not found"}), 404
        elif(userdata['password']!=data['password']):
            return  jsonify({"message": "Incorrect Password"}), 401
        else:
            return jsonify({"success": True,"message":"Login Successful","status":200}), 200
        
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/getlocation' , methods=['GET'])
def getLocation():
    try:
        data = collection4.find()
        data_list = list(data)
        for item in data_list:
            item.pop('_id', None)
        return ({"location":data_list,"message":"Successfully Fetched"}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



@app.route('/api/createtrip' , methods=['POST'])
def createTrip():
    try:
        data = request.get_json()  
        collection2.insert_one(data)
        return jsonify({"message": "Trip data inserted successfully","success":True}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/gettrip' , methods=['POST'])
def getTrip():
    try:
        userdata = request.get_json() 
        email = userdata.get('email')  
        data_cursor = collection2.find({"email": email}) 
        
        data_list = list(data_cursor)
        if not data_list:
            return jsonify({"error": "No trips found for this email", "success": False}), 404
        
        for data in data_list:
            if '_id' in data:
                del data['_id']

        return jsonify({"trips": data_list, "success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/my-server/create-paypal-order', methods=['POST'])
def create_paypal_order():
    try:
        # Get the cart details from the request body
        amount=request.get_json().get("amount")
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": str(amount),
                    "currency": "USD"
                },
                "description": "Order description"
            }],
            "redirect_urls": {
                "return_url": "http://localhost:5000/payment/execute",  # Where PayPal redirects after payment
                "cancel_url": "http://localhost:5000/payment/cancel"   # Where PayPal redirects if payment is canceled
            }
        })

        # Create the payment on PayPal
        if payment.create():
            approval_url = None
            for link in payment.links:
                if link.rel == "approval_url":
                    approval_url = link.href
                    break
            return jsonify({"id": payment.id, "approval_url": approval_url})

        else:
            return jsonify({"error": "Payment creation failed", "details": payment.error}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500





@app.route('/payment/execute', methods=['GET'])
def execute_payment():
    payment_id = request.args.get('paymentId')
    payer_id = request.args.get('PayerID')

    payment = Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):
        return jsonify({'status': 'Payment successful'})
    else:
        return jsonify({'error': 'Payment execution failed'}), 500


@app.route('/payment/cancel', methods=['GET'])
def cancel_payment():
    return jsonify({'status': 'Payment canceled'})



if __name__ == '__main__':
    app.run(debug=True,port=5000)
