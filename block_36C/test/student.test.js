const request = require('supertest');
const app = require('../app');

jest.mock('../db');
const db = require('../db');

describe('/students', () => {
    it('should return list of students', async () => {
        db.query.mockResolvedValueOnce({
            rows: [
                { id: 1, name: 'Lynda Windler', cohort: '2005', instructorid: 1 },
                { id: 2, name: 'Candice Bashirian', cohort: '2012', instructorid: 2 }
            ],
        });
        const res = await request(app).get('/api/students');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            { id: 1, name: 'Lynda Windler', cohort: '2005', instructorid: 1 },
            { id: 2, name: 'Candice Bashirian', cohort: '2012', instructorid: 2 }
        ]);
    });

    it('should create a new student', async () => {
        const newStudent = { name: 'John Doe', cohort: '2023', instructorid: 3 };
        db.query.mockResolvedValueOnce({
            rows: [{ id: 21, ...newStudent }],
        });
        const res = await request(app).post('/api/students').send(newStudent);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 21, ...newStudent });
    });
});