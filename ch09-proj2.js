/* add your code here */

document.addEventListener("DOMContentLoaded", function () {

    fetch("paintings.json")
        .then(res => res.json())
        .then(paintings => {

            const ul = document.querySelector("#paintings ul")
            for (let p of paintings) {
                const li = document.createElement("li")
                const img = document.createElement("img")
                img.setAttribute("src", `/images/small/${p.id}.jpg`)
                li.appendChild(img)
                img.dataset.id = `${p.id}`
                ul.appendChild(li)
            }
            ul.addEventListener('click', function (e) {
                if (e.target && e.target.nodeName == "IMG") {
                    const figure = document.querySelector("figure")
                    figure.innerHTML = ""
                    const img = document.createElement("img")
                    img.setAttribute("src", `/images/large/${e.target.dataset.id}.jpg`)
                    figure.appendChild(img)

                    const painting = paintings.find(p => e.target.dataset.id == p.id)

                    const h2 = document.querySelector("h2")
                    const h3 = document.querySelector("h3")

                    h2.textContent = painting.title
                    h3.textContent = painting.artist

                    for (let rec of painting.features){
                        const div = document.createElement("div")
                        div.classList.add("box")
                        div.style.position = "absolute"
                        div.style.left = `${rec.upperLeft[0]}px`
                        div.style.top = `${rec.upperLeft[1]}px`
                        div.style.width = `${rec.lowerRight[0] - rec.upperLeft[0]}px`
                        div.style.height = `${rec.lowerRight[1] - rec.upperLeft[1]}px`
                        figure.append(div)

                        div.addEventListener('mouseover', function() {
                            const desc = document.querySelector("#description")
                            desc.textContent = rec.description
                        })
                        div.addEventListener('mouseout', function (){
                            const desc = document.querySelector("#description")
                            desc.textContent = ""
                        })

                    }
                }
            })



        })


})


