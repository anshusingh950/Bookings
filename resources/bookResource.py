from flask_restful import Resource
from flask import request
import json

houses = [{"id":1,"SalePrice": 402043,"OverAllQual":10,"TotalBsmtSF":200,"GrLivArea":50,"BsmtFullBath":2,"GarageCars":1,"YearBuilt":1989,"MasVerArea":100}]


class HousesGETResource(Resource):
    def get(self):
        return houses

class HouseGETResource(Resource):
    def get(self, id):
        for house in houses:
            if house["id"] == id:
                return house
        return None


class HousePOSTResource(Resource):
    def post(self):
        house = json.loads(request.data)
        new_id = max(house["id"] for house in houses) + 1
        house["id"] = new_id
        houses.append(house)
        return house


class HousePUTResource(Resource):
    def put(self, id):
        house = json.loads(request.data)
        for _house in houses:
            if _house["id"] == id:
                _house.update(house)
                return _house


class HouseDELETEResource(Resource):
    def delete(self, id):
        global houses
        houses = [house for house in houses if house["id"] != id]
        return "", 204






class CoursesGETResource(Resource):
    def get(self):
        return courses

class CourseGETResource(Resource):
    def get(self, id):
        for course in courses:
            if course["id"] == id:
                return course
        return None


class CoursePOSTResource(Resource):
    def post(self):
        course = json.loads(request.data)
        new_id = max(course["id"] for course in courses) + 1
        course["id"] = new_id
        courses.append(course)
        return course


class CoursePUTResource(Resource):
    def put(self, id):
        course = json.loads(request.data)
        for _course in courses:
            if _course["id"] == id:
                _course.update(course)
                return _course


class CourseDELETEResource(Resource):
    def delete(self, id):
        global courses
        courses = [course for course in courses if course["id"] != id]
        return "", 204
