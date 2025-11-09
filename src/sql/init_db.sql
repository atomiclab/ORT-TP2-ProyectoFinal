-- ============================================
-- Script de inicialización de base de datos
-- Supabase PostgreSQL
-- ============================================

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(50),
    edad INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    password VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas por email (ya es único, pero útil para performance)
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_activo ON usuarios(activo);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para productos
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_stock ON productos(stock);

-- Tabla de characters (basado en CharacterModel)
CREATE TABLE IF NOT EXISTS characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    race VARCHAR(100),
    class_name VARCHAR(100),  -- class es palabra reservada, usamos class_name
    guild VARCHAR(255),
    hp INTEGER DEFAULT 0,
    shield INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    is_online BOOLEAN DEFAULT false,
    kingdom VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_characters_user FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para characters
CREATE INDEX IF NOT EXISTS idx_characters_user_id ON characters(user_id);
CREATE INDEX IF NOT EXISTS idx_characters_name ON characters(name);
CREATE INDEX IF NOT EXISTS idx_characters_race ON characters(race);
CREATE INDEX IF NOT EXISTS idx_characters_class ON characters(class_name);
CREATE INDEX IF NOT EXISTS idx_characters_guild ON characters(guild);
CREATE INDEX IF NOT EXISTS idx_characters_level ON characters(level);
CREATE INDEX IF NOT EXISTS idx_characters_is_online ON characters(is_online);
CREATE INDEX IF NOT EXISTS idx_characters_kingdom ON characters(kingdom);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_usuarios_updated_at 
    BEFORE UPDATE ON usuarios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_productos_updated_at 
    BEFORE UPDATE ON productos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_characters_updated_at 
    BEFORE UPDATE ON characters 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios en las tablas (opcional pero útil)
COMMENT ON TABLE usuarios IS 'Tabla de usuarios del sistema';
COMMENT ON TABLE productos IS 'Tabla de productos del catálogo';
COMMENT ON TABLE characters IS 'Tabla de personajes del juego';

COMMENT ON COLUMN usuarios.id IS 'ID único del usuario (UUID)';
COMMENT ON COLUMN usuarios.email IS 'Email único del usuario';
COMMENT ON COLUMN usuarios.password IS 'Contraseña hasheada con bcrypt';

COMMENT ON COLUMN productos.id IS 'ID único del producto (Serial)';
COMMENT ON COLUMN productos.precio IS 'Precio del producto en decimal';

COMMENT ON COLUMN characters.id IS 'ID único del personaje (UUID)';
COMMENT ON COLUMN characters.user_id IS 'ID del usuario propietario del personaje (Foreign Key a usuarios)';
COMMENT ON COLUMN characters.class_name IS 'Clase del personaje (class es palabra reservada)';
COMMENT ON COLUMN characters.is_online IS 'Indica si el personaje está online';