const request = require('supertest');
const app = require('../app');
jest.mock('../db');
const db = require('../db');

describe('/instructors', () => {
    it('should return list of instructors', async () => {
        db.query.mockResolvedValueOnce({
            rows: [
                { id: 1, username: 'Misael2', password: 'oQZCAJgIiLeWEOR' },
                { id: 2, username: 'Emmy.Wisoky', password: 'ozw687FaN0W8M80' }
            ],
        });
        const res = await request(app).get('/api/instructors');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            { id: 1, username: 'Misael2', password: 'oQZCAJgIiLeWEOR' },
            { id: 2, username: 'Emmy.Wisoky', password: 'ozw687FaN0W8M80' }
        ]);
    });

    it('should create a new instructor', async () => {
        const newInstructor = { username: 'Kelsie_Corwin', password: 'FYtj0WHV8vAQN6O' };
        db.query.mockResolvedValueOnce({
            rows: [{ id: 4, ...newInstructor }],
        });
        const res = await request(app).post('/api/instructors').send(newInstructor);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 4, ...newInstructor });
    });
});