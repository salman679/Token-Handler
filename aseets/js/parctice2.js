
let btn = document.getElementById('add-token');

let TokenData = [];
tokenHandler()

let updeteItems;
btn.addEventListener('click', e => {
    e.preventDefault();

    let activeItems = {};
    let fullForm = new FormData(document.getElementById('total-form'));
    fullForm.forEach((value, proparty) => {
        activeItems[proparty] = value;
    })

    if (updateItems) {
        TokenData = TokenData.map(item => {
            if (item.id == updateItems) {
                return {
                    ...activeItems,
                    id: updateItems
                }
            } else {
                return item;
            }
        })
    }
    else {
        TokenData.push({
            ...activeItems,
            id: TokenData.length + 1,
            Status: activeItems.Status
        })

    }

    tokenHandler()
    editHandler()
    document.getElementById('total-form').reset();
    updateItems = '';
})

// create li structure
function liStructure(gold) {
    return `<li data-id=${gold.id} class="active-info">
                <div class="left">
                    <p>${gold.name}</p>
                    <span>${gold.phone}</span>
                </div>
                <div class="right">
                    <a href="#">Token No: ${gold.id}</a>
                </div>
            </li>`
}

// tokenHandler
function tokenHandler() {

    let ulElements = [{
        Status: 'Active',
        ulElement: document.getElementById('ul-active'),
        liElements: [],
        totalsectionData: document.getElementById('total-active')
    },
    {
        Status: 'Complete',
        ulElement: document.getElementById('ul-complete'),
        liElements: [],
        totalsectionData: document.getElementById('total-complete')
    },
    {
        Status: 'Cancel',
        ulElement: document.getElementById('ul-cancel'),
        liElements: [],
        totalsectionData: document.getElementById('total-cancel')
    }]


    TokenData.map(items => {
        ulElements.map(element => {
            if (element.Status == items.Status) {
                element.liElements.push(liStructure(items));
            }
        })
    })

    ulElements.forEach(li => {
        li.ulElement.innerHTML = li.liElements.join('');
        li.totalsectionData.innerHTML = li.liElements.length;
    })
    document.getElementById('Total-Token').innerHTML = TokenData.length <= 9 ? "0" + TokenData.length : TokenData.length;
}

// editHandler
function editHandler() {
    let tokenPackege = document.querySelector('.token-package');
    tokenPackege.addEventListener('click', e => {
        e.preventDefault();

        let li = e.target.closest('.active-info');
        let dataid = li.getAttribute('data-id');
        console.log(li);

        if (li) {
            let editLi = TokenData.find(item => {
                return item.id == dataid;
            })

            // push data to form
            // document.querySelector('[name="name"]').value = editLi.name;
            // document.querySelector('[name="phone"]').value = editLi.phone;
            // document.querySelector('[name="Status"]').value = editLi.Status;

            for (const edit in editLi) {
                if (document.querySelector(`[name="${edit}"]`)) {
                    document.querySelector(`[name="${edit}"]`).value = editLi[edit];
                }
            }
        }
        updateItems = dataid;

    })
}