import sqlite3, sys, MyLibrary

try:
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS clients (
                nome TEXT,
                cpf TEXT UNIQUE PRIMARY KEY,
                telefone TEXT,
                email TEXT,
                estado TEXT,
                cidade TEXT,
                bairro TEXT,
                rua TEXT,
                endereco INTEGER
            );
        ''')
        conn.commit()
except:
    print("Erro ao conectar ao banco de dados ou criar tabelas.")
    sys.exit(1)



class Database:
    def __init__(self):
        self.clients_list = []
        self.CPFs = []
        self.telefones = []
        self.emails = []
        try:
            with sqlite3.connect('database.db') as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM clients")
                clients = cursor.fetchall()
                for i in clients:
                    self.clients_list.append(Client(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], False))
                    self.CPFs.append(i[1])
                    self.telefones.append(i[2])
                    self.emails.append(i[3])
        except:
            print("Erro ao conectar ao banco de dados ou criar tabelas")
    
    def add_client(self, name: str, cpf: str, telefone: str, email: str, estado: str, cidade: str, bairro: str, rua: str, endereco: int):
        self.clients_list.append(Client(name, cpf, telefone, email, estado, cidade, bairro, rua, endereco, True))
        self.CPFs.append(cpf)
        self.telefones.append(telefone)
        self.emails.append(email)

    def find_client(self, cpf):
        for i in self.clients_list:
            if i.cpf == cpf:
                return i

    def delete(self, cpf):
        try:
            remove = self.find_client(cpf)
            if remove:
                with sqlite3.connect('database.db') as conn:
                    cursor = conn.cursor()

                    cursor.execute('''
                        DELETE FROM clients WHERE cpf = ?;
                    ''', (cpf,))
                    conn.commit()
                self.CPFs.remove(remove.cpf)
                self.telefones.remove(remove.telefone)
                self.emails.remove(remove.email)
                self.clients_list.remove(remove)
        except:
            print("Erro ao conectar ao banco de dados ou criar tabelas!")
    
    def to_dict(self):
        list_dict = []
        for i in self.clients_list:
            list_dict.append(i.__dict__)
        return list_dict

    # Implementar em futuras versões
    # def seach(self, pesquisa):
    #     resultado = []
    #     for i in self.clients_list:
    #         if pesquisa == i.nome or pesquisa == i.cpf or pesquisa == i.telefone or pesquisa == i.email or pesquisa == i.nome or pesquisa == i.estado or pesquisa == i.cidade or pesquisa == i.bairro or pesquisa == i.rua or pesquisa == i.endereco: 
    #             resultado.append(i)
    #     return resultado


class Client:
    def __init__(self, nome: str, cpf: str, telefone: str, email: str, estado: str, cidade: str, bairro: str, rua: str, endereco: int, new: bool):
        self.nome = nome
        self.cpf = cpf
        self.telefone = telefone
        self.email = email
        self.estado = estado
        self.cidade = cidade
        self.bairro = bairro
        self.rua = rua
        self.endereco = endereco
        if new:
            try:
                with sqlite3.connect('database.db') as conn:
                    cursor = conn.cursor()

                    cursor.execute('''
                        INSERT INTO clients (nome, cpf, telefone, email, estado, cidade, bairro, rua, endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
                    ''', (self.nome, self.cpf, self.telefone, self.email, self.estado, self.cidade, self.bairro, self.rua, self.endereco))
                    conn.commit()
            except:
                print("Erro ao conectar ao banco de dados ou criar tabelas.")
                sys.exit(1)

    def edit(self, new_nome: str, new_cpf: str, new_telefone: int, new_email: str, new_estado: str, new_cidade: str, new_bairro: str, new_rua: str, new_endereco: int):
        try:
            with sqlite3.connect('database.db') as conn:
                cursor = conn.cursor()

                cursor.execute('''
                    UPDATE clients SET nome = ?, cpf = ?, telefone = ?, email = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, endereco = ? WHERE cpf = ?;
                ''', (new_nome, new_cpf, new_telefone, new_email, new_estado, new_cidade, new_bairro, new_rua, new_endereco, self.cpf))
                conn.commit()
            self.cpf = new_cpf
            self.telefone = new_telefone
            self.email = new_email
            self.estado = new_estado
            self.cidade = new_cidade
            self.bairro = new_bairro
            self.rua = new_rua
            self.endereco = new_endereco
        except:
            print("Erro ao conectar ao banco de dados ou criar tabelas!")
            sys.exit(1)