<template>
    <div class="time">
        <canvas>time</canvas>
        <p class="clock">{{ time }}</p>
    </div>
</template>

<script>
export default {
    name: 'Time',
    data() {
        return {
            time: ''
        }
    },
    created() {
        this.time = new Date().toString().substring(16,24)
        setInterval(() => {
           this.time = new Date().toString().substring(16,24)
        }, 1000);
    },
    mounted() {
        const os = document.querySelector('canvas')
        os.width = os.height = document.documentElement.clientWidth*2/3
        if(os.getContext){
            var ctx = os.getContext('2d')
            ctx.translate(os.width/2, os.height/2)
            ctx.save()
            ctx.lineWidth = 5
            ctx.strokeStyle = 'gray'
            ctx.beginPath()
            ctx.arc(0,0,os.width/2-10,0,2*Math.PI)
            ctx.stroke()
            ctx.restore()

            for(var i=0; i < 60; i ++){
                ctx.save()
                ctx.lineWidth = 4
                ctx.rotate(6*i*Math.PI/180)
                ctx.lineCap = 'round'
                ctx.beginPath()
                if(i%5===0){
                    ctx.moveTo(0,os.width/2-30)
                    ctx.lineTo(0,os.width/2-15)
                } else {
                    ctx.moveTo(0,os.width/2-25)
                    ctx.lineTo(0,os.width/2-15)
                }
                ctx.stroke()
                ctx.restore()
            }
            

            function Hpointer (hDeg) {
                ctx.save()
                ctx.lineWidth = 8
                ctx.rotate(hDeg)
                ctx.lineCap = 'round'
                ctx.beginPath()
                ctx.moveTo(0,10)
                ctx.lineTo(0,-30)
                ctx.stroke()
                ctx.restore()
            }

            function Mpointer (mDeg) {
                ctx.save()
                ctx.lineWidth = 5
                ctx.rotate(mDeg)
                ctx.strokeStyle = 'gray'
                ctx.lineCap = 'round'
                ctx.beginPath()
                ctx.moveTo(0,13)
                ctx.lineTo(0,-55)
                ctx.stroke()
                ctx.restore()
            }

            function Spointer (sDeg) {
                ctx.save()
                ctx.lineWidth = 5
                ctx.rotate(sDeg)
                ctx.strokeStyle = 'red'
                ctx.lineCap = 'round'
                ctx.beginPath()
                ctx.moveTo(0,15)
                ctx.lineTo(0,-65)
                ctx.stroke()
                ctx.restore()
            }

            function CirCen () {
                ctx.save()
                ctx.fillStyle = 'red'
                ctx.beginPath()
                ctx.arc(0,0,10,0,2*Math.PI)
                ctx.fill()
                ctx.restore()
            }

            function clearR() {
                ctx.save()
                ctx.fillStyle = 'white'
                ctx.beginPath()
                ctx.arc(0,0,68,0,2*Math.PI)
                ctx.fill()
                ctx.restore()
            }
            var a = new Date()
            let hh = a.getHours()%12
            let mm = a.getMinutes()
            let ss = a.getSeconds()

            let sDeg = ss/60*2*Math.PI            
            let mDeg = mm/60*2*Math.PI + sDeg/60
            let hDeg = hh/12*2*Math.PI + mDeg/12
            clearR()
            Hpointer(hDeg)
            Mpointer(mDeg)
            Spointer(sDeg)
            CirCen()

            setInterval(() => {
                var a = new Date()
                let hh = a.getHours()%12
                let mm = a.getMinutes()
                let ss = a.getSeconds()

                let sDeg = ss/60*2*Math.PI            
                let mDeg = mm/60*2*Math.PI + sDeg/60
                let hDeg = hh/12*2*Math.PI + mDeg/12
                clearR()
                Hpointer(hDeg)
                Mpointer(mDeg)
                Spointer(sDeg)
                CirCen()
            }, 1000);
            
        }
    }
}
</script>

<style lang="scss" scoped>
.time {
    canvas {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    p {
        text-align: center;
        margin-top: 50px;
        font-size: 25px;
    }
}
</style>
