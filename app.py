from flask import Flask, render_template, jsonify, request
import MyLibrary, database, re, sys
database = database.Database()

app = Flask(__name__)

def validar_telefone(telefone):
    return telefone not in database.telefones

def validar_email(email):
    return email not in database.emails

def validar_CPF(CPF):
    return CPF not in database.CPFs

def validar_nome(nome):
    if ' ' not in nome:
        return False
    if nome.strip() == "":
        return False
    return True

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/processar_cadastro', methods=['POST'])
def processar_cadastro():
    nome = request.form['nome']
    cpf = request.form['cpf']
    telefone = request.form['telefone']
    email = request.form['email']
    estado = request.form['estado']
    cidade = request.form['cidade']
    bairro = request.form['bairro']
    rua = request.form['rua']
    numero = request.form['numero']

    if not MyLibrary.Verify.cpf(cpf):
        return jsonify({"erro": "CPF Inválido!"}), 400
    if not validar_nome(nome):
        return jsonify({"erro": "Nome Inválido!"}), 400
    if not validar_CPF(cpf):
        return jsonify({"erro": "CPF Já Cadastrado!"}), 400
    if not validar_telefone(telefone):
        return jsonify({"erro": "Telefone Já Cadastrado!"}), 400
    if not validar_email(email):
        return jsonify({"erro": "E-mail Já Cadastrado!"}), 400

    database.add_client(nome, cpf, telefone, email, estado, cidade, bairro, rua, int(numero))
    return jsonify({"mensagem": "Cadastro Realizado Com Sucesso!"})



@app.route('/list')
def list():
    return render_template('list.html')

@app.route('/obter_objetos')
def obter_objetos():
    objetos = database.to_dict()

    return jsonify(objetos)

@app.route('/deletar_cliente', methods=['POST'])
def deletar_cliente():
    data = request.get_json()
    cpf = data.get('cpf')

    if not cpf:
        return jsonify({"erro": "CPF não fornecido!"}), 400

    try:
        success = database.delete(cpf)
        if success:
            return jsonify({"mensagem": "Cliente deletado com sucesso!"}), 200
        else:
            return jsonify({"erro": "Cliente não encontrado!"}), 404
    except:
        return jsonify({"erro": "Erro ao deletar cliente!"}), 500



@app.route('/edit')
def edit():
    return render_template('edit.html')

@app.route('/processar_alteracao', methods=['POST'])
def processar_alteracao():
    cliente = request.form['cliente']
    telefone_atual = request.form['telefone_atual']
    email_atual = request.form['email_atual']
    nome = request.form['nome']
    cpf = request.form['cpf']
    telefone = request.form['telefone']
    email = request.form['email']
    estado = request.form['estado']
    cidade = request.form['cidade']
    bairro = request.form['bairro']
    rua = request.form['rua']
    numero = request.form['numero']

    if not MyLibrary.Verify.cpf(cpf):
        return jsonify({"erro": "CPF Inválido!"}), 400
    if not validar_nome(nome):
        return jsonify({"erro": "Nome Inválido!"}), 400
    if not validar_CPF(cpf) and cpf != cliente:
        return jsonify({"erro": "CPF Já Cadastrado!"}), 400
    if not validar_telefone(telefone) and telefone != telefone_atual:
        return jsonify({"erro": "Telefone Já Cadastrado!"}), 400
    if not validar_email(email) and email != email_atual:
        return jsonify({"erro": "E-mail Já Cadastrado!"}), 400

    for i in database.clients_list:
        if i.cpf == cliente:
            i.edit(nome, cpf, telefone, email, estado, cidade, bairro, rua, int(numero))
    return jsonify({"mensagem": "Cadastro Alterado Com Sucesso!"})



if __name__ == '__main__':
    app.run(debug=True)
