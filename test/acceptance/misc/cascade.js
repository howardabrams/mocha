
describe('one', function(){
  before(function(){
    process.stdout.write('before one'+'\n');
  })
  
  after(function(){
    process.stdout.write('after one'+'\n');
  })
  
  beforeEach(function(){
    process.stdout.write('  before each one'+'\n');
  })

  afterEach(function(){
    process.stdout.write('  after each one'+'\n');
  })

  describe('two', function(){
    before(function(){
      process.stdout.write('  before two'+'\n');
    })
    
    after(function(){
      process.stdout.write('  after two'+'\n');
    })
    
    beforeEach(function(){
      process.stdout.write('    before each two'+'\n');
    })
    
    afterEach(function(){
      process.stdout.write('    after each two'+'\n');
    })
    
    describe('three', function(){
      before(function(){
        process.stdout.write('    before three'+'\n');
      })
      
      after(function(){
        process.stdout.write('    after three'+'\n');
      })

      beforeEach(function(){
        process.stdout.write('    before each three'+'\n');
      })
      
      afterEach(function(){
        process.stdout.write('    after each three'+'\n');
      })

      it('should three', function(){
        process.stdout.write('      TEST three'+'\n');
      })
    })
  })
})
