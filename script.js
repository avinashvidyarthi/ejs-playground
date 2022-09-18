function bootstrap() {
	const editor = ace.edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.getSession().setMode('ace/mode/ejs');
	editor.setValue(
		`<h1  style='text-align:center'> EJS Playground </h1>
<%
    const phoneCompany = ["Apple", "Samsung", "One+", "Nothing"];
%>

Here are the list
<% for(let i = 0; i < phoneCompany.length; ++i) {%>
 <br> - <%=phoneCompany[i] %> <% } %>

<br> <br>   

Loop through 1 to 100:
<% for(let count = 0; count <= 100; count++ ){ %>
    <br> <%= count %>
<% } %>

<%#  This is a comment! %>
	`,
		-1
	);
	editor.focus();
	editor.on('change', updateOutput);
	updateOutput();

	function updateOutput() {
		const outputArea = document.getElementById('output');
		const code = editor.getValue();
		console.log(code);

		try {
			const result = ejs.render(code);
			outputArea.classList.remove('bg-danger');
			outputArea.classList.add('bg-success');
			outputArea.innerHTML = result;
		} catch (err) {
			outputArea.classList.remove('bg-success');
			outputArea.classList.add('bg-danger');
			outputArea.innerText = err.stack;
			console.log(err.stack);
		}
	}
}

bootstrap();
