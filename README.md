# html-trabalho-final

1. Para substituir partes de todas as paginas:
2. <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>H</kbd>
3. Copie uma expressão

```regex
<!--MENU-->[^[](.|\n)+<!--MENU_END-->
```
```regex
<!--BODY-->[^[](.|\n)+<!--BODY_END-->
```
```regex
<!--FOOTER-->[^[](.|\n)+<!--FOOTER_END-->
```

4. Ative expressões regulares <kbd><b>.*</b></kbd> (<kbd>ALT</kbd>+<kbd>R</kbd>) 
5. Cole a expressão e o texto de substituição contendo os comentários no começo e no fim. 