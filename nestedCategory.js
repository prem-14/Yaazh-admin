function getNestedChildren(arr, parentId, level) {
  level++
  var out = []
  for (var i in arr) {
    if (arr[i].parentId == parentId) {
      var children = getNestedChildren(arr, arr[i].id, level)

      if (children.length) {
        arr[i].subCate = children
      }
      out.push({ level, ...arr[i] })
    }
  }
  return out
}

console.log(
  JSON.stringify(
    getNestedChildren(
      [
        { id: 1, name: 'edwd', parentId: null },
        { id: 2, name: 'ttt', parentId: null },
        { id: 3, name: 'ooo', parentId: 1 },
        { id: 4, name: 'ppp', parentId: 3 },
        { id: 5, name: 'lll', parentId: 4 },
        { id: 6, name: 'mmm', parentId: 4 },
        { id: 7, name: 'nnn', parentId: 3 },
        { id: 8, name: 'zzz', parentId: 2 },
      ],
      null,
      0
    )
  )
)

const result = [
  {
    level: 1,
    id: 1,
    name: 'edwd',
    parentId: null,
    subCate: [
      {
        level: 2,
        id: 3,
        name: 'ooo',
        parentId: 1,
        subCate: [
          {
            level: 3,
            id: 4,
            name: 'ppp',
            parentId: 3,
            subCate: [
              { level: 4, id: 5, name: 'lll', parentId: 4 },
              { level: 4, id: 6, name: 'mmm', parentId: 4 },
            ],
          },
          { level: 3, id: 7, name: 'nnn', parentId: 3 },
        ],
      },
    ],
  },
  { level: 1, id: 2, name: 'ttt', parentId: null, subCate: [{ level: 2, id: 8, name: 'zzz', parentId: 2 }] },
]
/*
edwd   
  ooo
    ppp
      lll
      mmm
    nnn
ttt
  zzz
  */

function formatCategories(categories, indentLevel = 0) {
  let html = ''
  categories.forEach((category) => {
    html += `<MenuItem value="${category.id}">
                <div className='nested' style={{ marginLeft: '${indentLevel * 20}px' }}>
                  ${category.name}
                </div>
              </MenuItem>
    `

    if (category.subCate) {
      html += formatCategories(category.subCate, indentLevel + 1)
    }
    if (indentLevel == 0) {
      html += `<Divider />`
    }
  })
  return html
}

const result1 = [
  {
    level: 1,
    id: 1,
    name: 'edwd',
    parentId: null,
    subCate: [
      {
        level: 2,
        id: 3,
        name: 'ooo',
        parentId: 1,
        subCate: [
          {
            level: 3,
            id: 4,
            name: 'ppp',
            parentId: 3,
            subCate: [
              { level: 4, id: 5, name: 'lll', parentId: 4 },
              { level: 4, id: 6, name: 'mmm', parentId: 4 },
            ],
          },
          { level: 3, id: 7, name: 'nnn', parentId: 3 },
        ],
      },
    ],
  },
  { level: 1, id: 2, name: 'ttt', parentId: null, subCate: [{ level: 2, id: 8, name: 'zzz', parentId: 2 }] },
]

const formattedHtml = formatCategories(result1)
console.log(formattedHtml)

/* "<MenuItem value='1'>
<div className='nested' style={{ marginLeft: '0px' }}>
edwd
</div>
</MenuItem>
<MenuItem value='3'>
<div className='nested' style={{ marginLeft: '20px' }}>
ooo
</div>
</MenuItem>
<MenuItem value='4'>
<div className='nested' style={{ marginLeft: '40px' }}>
ppp
</div>
</MenuItem>
<MenuItem value='5'>
<div className='nested' style={{ marginLeft: '60px' }}>
lll
</div>
</MenuItem>
<MenuItem value='6'>
<div className='nested' style={{ marginLeft: '60px' }}>
mmm
</div>
</MenuItem>
<MenuItem value='7'>
<div className='nested' style={{ marginLeft: '40px' }}>
nnn
</div>
</MenuItem>
<Divider /><MenuItem value='2'>
<div className='nested' style={{ marginLeft: '0px' }}>
ttt
</div>
</MenuItem>
<MenuItem value='8'>
<div className='nested' style={{ marginLeft: '20px' }}>
zzz
</div>
</MenuItem>
<Divider />"
*/

/*
////////////// ParentIDs

function getNestedChildren(arr, parentId, level, parentIds = []) {
  level++;
  var out = [];
  for (var i in arr) {
    if (arr[i].parentId == parentId) {
      var children = getNestedChildren(arr, arr[i].id, level, [...parentIds, arr[i].id]);

      if (children.length) {
        arr[i].subCate = children;
      }
      out.push({ level, parentIds: [...parentIds], ...arr[i] });
    }
  }
  return out;
}

console.log(
  
    getNestedChildren(
      [
        { id: 1, name: 'edwd', parentId: null },
        { id: 2, name: 'ttt', parentId: null },
        { id: 3, name: 'ooo', parentId: 1 },
        { id: 4, name: 'ppp', parentId: 3 },
        { id: 5, name: 'lll', parentId: 4 },
        { id: 6, name: 'mmm', parentId: 4 },
        { id: 7, name: 'nnn', parentId: 3 },
        { id: 8, name: 'zzz', parentId: 2 },
      ],
      null,
      0
    )
  
);

const result = [
  {
    level: 1,
    parentIds: [],
    id: 1,
    name: 'edwd',
    parentId: null,
    subCate: [
      {
        level: 2,
        parentIds: [1],
        id: 3,
        name: 'ooo',
        parentId: 1,
        subCate: [
          {
            level: 3,
            parentIds: [1, 3],
            id: 4,
            name: 'ppp',
            parentId: 3,
            subCate: [
              {
                level: 4,
                parentIds: [1, 3, 4],
                id: 5,
                name: 'lll',
                parentId: 4,
              },
              {
                level: 4,
                parentIds: [1, 3, 4],
                id: 6,
                name: 'mmm',
                parentId: 4,
              },
            ],
          },
          {
            level: 3,
            parentIds: [1, 3],
            id: 7,
            name: 'nnn',
            parentId: 3,
          },
        ],
      },
    ],
  },
  {
    level: 1,
    parentIds: [],
    id: 2,
    name: 'ttt',
    parentId: null,
    subCate: [
      {
        level: 2,
        parentIds: [2],
        id: 8,
        name: 'zzz',
        parentId: 2,
      },
    ],
  },
]
*/

/*
////////////// ParentIDs and ChildIDs
function getNestedChildren(arr, parentId, level, parentIds = []) {
  level++;
  var out = [];
  for (var i in arr) {
    if (arr[i].parentId == parentId) {
      var children = getNestedChildren(arr, arr[i].id, level, [...parentIds, arr[i].id]);

      if (children.length) {
        arr[i].subCate = children;
      }

      // Get all the childIds for the current category
      var childIds = [];
      for (var j in children) {
        childIds.push(...children[j].childIds, children[j].id);
      }

      out.push({ level, parentIds: [...parentIds], childIds: [...childIds], ...arr[i] });
    }
  }
  return out;
}


console.log(
  
    getNestedChildren(
      [
        { id: 1, name: 'edwd', parentId: null },
        { id: 2, name: 'ttt', parentId: null },
        { id: 3, name: 'ooo', parentId: 1 },
        { id: 4, name: 'ppp', parentId: 3 },
        { id: 5, name: 'lll', parentId: 4 },
        { id: 6, name: 'mmm', parentId: 4 },
        { id: 7, name: 'nnn', parentId: 3 },
        { id: 8, name: 'zzz', parentId: 2 },
      ],
      null,
      0
    )
  
);

const result = [
  {
    level: 1,
    parentIds: [],
    childIds: [5, 6, 4, 7, 3],
    id: 1,
    name: 'edwd',
    parentId: null,
    subCate: [
      {
        level: 2,
        parentIds: [1],
        childIds: [5, 6, 4, 7],
        id: 3,
        name: 'ooo',
        parentId: 1,
        subCate: [
          {
            level: 3,
            parentIds: [1, 3],
            childIds: [5, 6],
            id: 4,
            name: 'ppp',
            parentId: 3,
            subCate: [
              {
                level: 4,
                parentIds: [1, 3, 4],
                childIds: [],
                id: 5,
                name: 'lll',
                parentId: 4,
              },
              {
                level: 4,
                parentIds: [1, 3, 4],
                childIds: [],
                id: 6,
                name: 'mmm',
                parentId: 4,
              },
            ],
          },
          {
            level: 3,
            parentIds: [1, 3],
            childIds: [],
            id: 7,
            name: 'nnn',
            parentId: 3,
          },
        ],
      },
    ],
  },
  {
    level: 1,
    parentIds: [],
    childIds: [8],
    id: 2,
    name: 'ttt',
    parentId: null,
    subCate: [
      {
        level: 2,
        parentIds: [2],
        childIds: [],
        id: 8,
        name: 'zzz',
        parentId: 2,
      },
    ],
  },
]
*/
