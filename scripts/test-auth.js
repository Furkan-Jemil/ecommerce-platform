import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const AUTH_URL = `${BASE_URL}/api/auth`;

async function testAuth() {
    console.log('--- Phase 1: Health Check ---');
    try {
        const health = await axios.get(`${BASE_URL}/api/health`);
        console.log('Health Check Status:', health.status);
        console.log('Health Check Data:', health.data);
    } catch (error) {
        console.error('Health Check Failed:', error.message);
    }

    console.log('\n--- Phase 2: Registration Test ---');
    const testUser = {
        email: `test_user_${Date.now()}@example.com`,
        password: 'password123',
        name: 'Test Runner'
    };

    try {
        const registerResponse = await axios.post(`${AUTH_URL}/sign-up/email`, testUser);
        console.log('Registration Status:', registerResponse.status);
        console.log('Registration Success (BetterAuth returns session or user object)');

        // BetterAuth usually sets cookies, but let's check if we got a response body
        if (registerResponse.data) {
            console.log('Response Keys:', Object.keys(registerResponse.data));
        }

        console.log('\n--- Phase 3: Session Verification ---');
        // We'll need to pass back the cookies for verification
        const cookies = registerResponse.headers['set-cookie'];
        const sessionResponse = await axios.get(`${AUTH_URL}/get-session`, {
            headers: {
                Cookie: cookies ? cookies.join('; ') : ''
            }
        });
        console.log('Session Status:', sessionResponse.status);
        console.log('Session Data:', sessionResponse.data);

        if (sessionResponse.data) {
            console.log('LOGIN SUCCESSFUL');
        } else {
            console.log('LOGIN FAILED: No session returned');
        }

    } catch (error) {
        console.error('Auth Flow Failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

testAuth();
