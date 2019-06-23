
let todo1 = {
    showAddNew: false
}

let colorTheme = 'Pink peach';

$('input[type="text"]').hide();

$('#todoListUl').on('click', 'li', function () {  // Can only add to existing elements => add on parent and specify
    $(this).toggleClass('completed');
});

$('#todoListUl').on('click', 'li span', function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove()
    }); // Removes the entire element with parent, after fadeout
    event.stopPropagation();    // Stops event bubbling
});

$('input[type="text"]').keypress(function (event) {
    if (event.which === 13) {     // Checks if enter
        let todoText = $(this).val();
        $('#todoListUl').append('<li><span class="removeButton"><i class="far fa-trash-alt"></i></span> ' + todoText + '</li>')
        $(this).val('');
    }

})

$('#addItem').click(function () {
    togglePlusMinusIcon();
    $('input[type="text"]').fadeToggle();
    $('input[type="text"]').focus();
})

function togglePlusMinusIcon() {
    $('#addItem i').toggleClass('fas fa-plus');
    $('#addItem i').toggleClass('fas fa-minus');
    todo1.showAddNew = !todo1.showAddNew;
};


$('#colorsMenu').on('click', function() {
    $('colorsUl').fadeToggle();

})

$('.color-themes a').click(function() {
    if (colorTheme != ($(this).text())) {
        changeColorTheme($(this).text());
        colorTheme = $(this).text();
    };
        
})

function changeColorTheme(newColorTheme) {
    switch (newColorTheme){
        case 'Sky blue':
            $('body').css({
                'background': '#9cb8e2',
                'background': '-webkit-linear-gradient(to right, #b6fbff, #9cb8e2)',
                'background': 'linear-gradient(to right, #b6fbff, #9cb8e2)',
            });
            $('h1').css('background-color', 'rgb(134, 177, 210)');
            $('a').css('color', '#3d417785');
            setHoverColor('#2d64e685', '#3d417785');
            break;

        case 'Avocado green':
            $('body').css({
                'background': '#acefa2',  
                'background': '-webkit-linear-gradient(to right, #7db060, #acefa2)',
                'background': 'linear-gradient(to right, #acefa2, #7db060'
            });
            $('h1').css('background-color', '#44bb7d');
            $('a').css('color', 'rgba(23, 103, 52, 0.61)');
            setHoverColor('rgba(50, 130, 19, 0.52)', 'rgba(23, 103, 52, 0.61)');
            break;

        case 'Pink peach':
                $('body').css({
                    'background': '#e0c8ce',  
                    'background': '-webkit-linear-gradient(to right, #e0c8ce, #fffcdc)',
                    'background': 'linear-gradient(to right, #e0c8ce, #fffcdc)'
                });
                $('h1').css('background-color', 'rgba(241, 156, 177, 0.84)');
                $('a').css('color', '#a14c7ba3');
                setHoverColor('#dc80b3a3', '#a14c7ba3');
            break;
    }
};

function setHoverColor(onHover, standardColor) {
    $('a').mouseover(function() {
        $(this).css('color', onHover);
    }).mouseout(function() {
        $(this).css('color', standardColor);
    });
}

document.querySelector('.download').addEventListener('click', (e) => { 
    download('todolist.txt', 'text/plain');
 })


function download(name, type) {
    var a = document.querySelector('.download');
    var file = new Blob([getItems()], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
  }

function getItems(){
    const toDoListItems = document.querySelectorAll('#todoListUl li');
    const listItem = toDoListItems[0];
    let doneListItems = [];
    let textToSave = 'THINGS TO DO:\r\n';

    toDoListItems.forEach((li) => {
        if (li.classList.contains('completed')) {
            doneListItems.push(li.textContent);
        } else {
            textToSave += (li.textContent + '\r\n');
        }
    });

    // if there are completed items
    if (doneListItems.length > 0) {
    textToSave += ('\r\n\r\nCOMPLETED:\r\n');
    doneListItems.forEach((item) => {
        textToSave += item + '\r\n'; 
        })
    }
    return textToSave;
  }

  document.querySelector('.clear').addEventListener('click', (e) => { 
    document.querySelectorAll('#todoListUl li').forEach(li => li.parentNode.removeChild(li));
 })
  function clearList(){
    document.querySelectorAll('#todoListUl li').forEach(li => li.parentNode.removeChild(li));
  }
