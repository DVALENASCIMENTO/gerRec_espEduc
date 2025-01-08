document.getElementById("receiptForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obter os dados do formulário
    const studentName = document.getElementById("studentName").value;
    const courseName = document.getElementById("courseName").value;
    const amount = parseFloat(document.getElementById("amount").value).toFixed(2);
    const paymentDate = document.getElementById("paymentDate").value;

    // Exibir o recibo gerado na tela
    document.getElementById("outputName").textContent = studentName;
    document.getElementById("outputCourse").textContent = courseName;
    document.getElementById("outputAmount").textContent = amount;
    document.getElementById("outputDate").textContent = paymentDate;
    document.getElementById("receiptOutput").style.display = "block";

    // Gerar PDF estilizado
    document.getElementById("downloadBtn").addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Configurações gerais
        const pageWidth = doc.internal.pageSize.getWidth();

        // Título
        doc.setFontSize(18);
        const title = "RECIBO";
        const schoolName = "Espaço Escolar Educ";
        const titleWidth = doc.getTextWidth(title);
        const schoolNameWidth = doc.getTextWidth(schoolName);
        doc.text(title, (pageWidth - titleWidth) / 2, 20); // Centraliza o título
        doc.setFontSize(14);
        doc.text(schoolName, (pageWidth - schoolNameWidth) / 2, 30); // Centraliza o nome da escola

        // Dados da Escola
        doc.setFontSize(12);
        doc.text("CNPJ: 12.345.678/0001-90", 10, 50);
        doc.text("Endereço: Rua Exemplo, 123, Cidade, Estado", 10, 60);
        doc.text("Telefone: (11) 1234-5678", 10, 70);

        // Dados do Cliente
        doc.text("DADOS DO CLIENTE", 10, 90);
        doc.text(`Nome do Aluno: ${studentName}`, 10, 100);
        doc.text(`Curso: ${courseName}`, 10, 110);
        doc.text(`Valor Pago: R$ ${amount}`, 10, 120);
        doc.text(`Data de Pagamento: ${paymentDate}`, 10, 130);

        // Assinaturas
        doc.text("_________________________________", 10, 150);
        doc.text("Assinatura do Emitente", 10, 160);

        doc.text("_________________________________", 120, 150);
        doc.text("Assinatura do Cliente", 120, 160);

        // Baixar o PDF
        doc.save(`recibo_${studentName}.pdf`);
    });
});
