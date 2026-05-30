CREATE TABLE IF NOT EXISTS t_p2036102_day_after_landing.users (
    id SERIAL PRIMARY KEY,
    steam_id VARCHAR(32) UNIQUE NOT NULL,
    username VARCHAR(128),
    avatar_url TEXT,
    profile_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p2036102_day_after_landing.sessions (
    id VARCHAR(64) PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p2036102_day_after_landing.users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '30 days'
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON t_p2036102_day_after_landing.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON t_p2036102_day_after_landing.sessions(expires_at);
