# Lab13_testORM
--curl to see all books
curl.exe -X GET http://localhost:3000/api/books

--curl to add a book(i had to use this format because does not work)
$body = @{
    title = "Solo level S2"
    author = "Seydina"
    isbn = "1234567880"
    publication_year = 1949
    genre = "Adventure"
} | ConvertTo-Json
 
Invoke-RestMethod -Uri "http://localhost:3000/api/books" -Method Post -ContentType "application/json" -Body $body

--curl to update a book
$updateBody = @{
    title = "Solo Leveling"
    author = "Seydina"
    isbn = "1234567890"
    publication_year = 1950
    genre = "Action Fantasy"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/books/1" -Method Put -ContentType "application/json" -Body $updateBody

-- curl to remove a book
curl.exe -X DELETE "http://localhost:3000/api/books/1"

Seydina M M Dione
